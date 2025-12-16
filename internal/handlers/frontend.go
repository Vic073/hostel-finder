package handlers

import (
	"net/http"

	"hostel-finder/internal/database"
	"hostel-finder/internal/models"

	"github.com/gin-gonic/gin"
)

func ShowHostelsPage(c *gin.Context) {
	location := c.Query("location")
	maxPrice := c.Query("max_price")

	query := database.DB.Preload("Images")

	if location != "" {
		query = query.Where("location ILIKE ?", "%"+location+"%")
	}

	if maxPrice != "" {
		query = query.Where("price <= ?", maxPrice)
	}

	var hostels []models.Hostel
	query.Order("price asc").Find(&hostels)

	type HostelView struct {
		Name        string
		Location    string
		Price       float64
		Description string
		Images      []string
	}

	var viewData []HostelView

	for _, h := range hostels {
		var imgs []string
		for _, img := range h.Images {
			imgs = append(imgs, "/"+img.Path)
		}

		viewData = append(viewData, HostelView{
			Name:        h.Name,
			Location:    h.Location,
			Price:       h.Price,
			Description: h.Description,
			Images:      imgs,
		})
	}

	c.HTML(http.StatusOK, "layout.html", gin.H{
		"Hostels":  viewData,
		"Location": location,
		"MaxPrice": maxPrice,
	})
}
