package handlers

import (
	"hostel-finder/internal/database"
	"hostel-finder/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddReview(c *gin.Context) {
	userID := uint(c.GetFloat64("user_id"))
	hostelID := parseUint(c.Param("id"))

	var hostel models.Hostel
	if err := database.DB.First(&hostel, hostelID).Error; err != nil {
		c.JSON(404, gin.H{"error": "Hostel not found"})
		return
	}

	if hostel.OwnerID == userID {
		c.JSON(403, gin.H{"error": "Owners cannot review their own hostel"})
		return
	}

	var exists models.Review
	err := database.DB.
		Where("user_id = ? AND hostel_id = ?", userID, hostelID).
		First(&exists).Error

	if err == nil {
		c.JSON(400, gin.H{"error": "You already reviewed this hostel"})
		return
	}

	if err != gorm.ErrRecordNotFound {
		c.JSON(500, gin.H{"error": "Database error"})
		return
	}

	var input struct {
		Rating  int    `json:"rating"`
		Comment string `json:"comment"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if input.Rating < 1 || input.Rating > 5 {
		c.JSON(400, gin.H{"error": "Rating must be between 1 and 5"})
		return
	}

	review := models.Review{
		UserID:   userID,
		HostelID: hostelID,
		Rating:   input.Rating,
		Comment:  input.Comment,
	}

	database.DB.Create(&review)
	var avg float64

	database.DB.
		Model(&models.Review{}).
		Where("hostel_id = ?", hostelID).
		Select("AVG(rating)").
		Scan(&avg)

	database.DB.
		Model(&models.Hostel{}).
		Where("id = ?", hostelID).
		Update("average_rating", avg)

	c.JSON(201, gin.H{"message": "Review added"})
}
func ListReviews(c *gin.Context) {
	hostelID := parseUint(c.Param("id"))

	var reviews []models.Review
	database.DB.
		Where("hostel_id = ?", hostelID).
		Order("created_at desc").
		Find(&reviews)

	c.JSON(200, reviews)
}
