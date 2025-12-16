package handlers

import (
	"fmt"
	"math"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"hostel-finder/internal/database"
	"hostel-finder/internal/models"
)

type CreateHostelInput struct {
	Name        string  `json:"name" binding:"required"`
	Location    string  `json:"location" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Description string  `json:"description"`
}

func CreateHostel(c *gin.Context) {
	var input CreateHostelInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ownerID := uint(c.GetFloat64("user_id"))

	hostel := models.Hostel{
		Name:        input.Name,
		Location:    input.Location,
		Price:       input.Price,
		Description: input.Description,
		OwnerID:     ownerID,
	}

	if err := database.DB.Create(&hostel).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create hostel"})
		return
	}

	c.JSON(http.StatusCreated, hostel)
}

func ListHostels(c *gin.Context) {
	location := c.Query("location")
	maxPrice := c.Query("max_price")

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}

	if limit < 1 {
		limit = 10
	}

	if limit > 50 {
		limit = 50
	}

	offset := (page - 1) * limit

	query := database.DB.Model(&models.Hostel{}).Preload("Images")

	if location != "" {
		query = query.Where("location ILIKE ?", "%"+location+"%")
	}

	if maxPrice != "" {
		query = query.Where("price <= ?", maxPrice)
	}

	var total int64
	query.Count(&total)

	var hostels []models.Hostel
	query.
		Order("price asc").
		Limit(limit).
		Offset(offset).
		Find(&hostels)

	var response []HostelResponse

	for _, hostel := range hostels {
		var images []string
		for _, img := range hostel.Images {
			images = append(images, fmt.Sprintf(
				"http://localhost:8080/%s",
				img.Path,
			))
		}

		response = append(response, HostelResponse{
			ID:          hostel.ID,
			Name:        hostel.Name,
			Location:    hostel.Location,
			Price:       hostel.Price,
			Description: hostel.Description,
			Images:      images,
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"data":       response,
		"page":       page,
		"limit":      limit,
		"total":      total,
		"totalPages": int(math.Ceil(float64(total) / float64(limit))),
	})

}

func UpdateHostel(c *gin.Context) {
	id := c.Param("id")
	userID := uint(c.GetFloat64("user_id"))

	var hostel models.Hostel
	if err := database.DB.First(&hostel, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Hostel not found"})
		return
	}

	if hostel.OwnerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not your hostel"})
		return
	}

	var input CreateHostelInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hostel.Name = input.Name
	hostel.Location = input.Location
	hostel.Price = input.Price
	hostel.Description = input.Description

	database.DB.Save(&hostel)

	c.JSON(http.StatusOK, hostel)
}

func DeleteHostel(c *gin.Context) {
	id := c.Param("id")
	userID := uint(c.GetFloat64("user_id"))

	var hostel models.Hostel
	if err := database.DB.First(&hostel, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Hostel not found"})
		return
	}

	if hostel.OwnerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not your hostel"})
		return
	}

	database.DB.Delete(&hostel)

	c.JSON(http.StatusOK, gin.H{"message": "Hostel deleted"})
}

func UploadHostelImage(c *gin.Context) {
	hostelID := c.Param("id")
	userID := uint(c.GetFloat64("user_id"))

	var hostel models.Hostel
	if err := database.DB.First(&hostel, hostelID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Hostel not found"})
		return
	}

	if hostel.OwnerID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not your hostel"})
		return
	}

	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image is required"})
		return
	}

	dir := fmt.Sprintf("uploads/hostels/hostel_%d", hostel.ID)
	os.MkdirAll(dir, os.ModePerm)

	filename := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)
	path := filepath.Join(dir, filename)

	if err := c.SaveUploadedFile(file, path); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
		return
	}

	image := models.HostelImage{
		HostelID: hostel.ID,
		Path:     path,
	}

	database.DB.Create(&image)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Image uploaded",
		"path":    path,
	})
}

type HostelResponse struct {
	ID          uint     `json:"id"`
	Name        string   `json:"name"`
	Location    string   `json:"location"`
	Price       float64  `json:"price"`
	Description string   `json:"description"`
	Images      []string `json:"images"`
}
