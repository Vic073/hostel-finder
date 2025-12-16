package handlers

import (
	"hostel-finder/internal/database"
	"hostel-finder/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func parseUint(s string) uint {
	id, _ := strconv.ParseUint(s, 10, 64)
	return uint(id)
}

func AddFavorite(c *gin.Context) {
	userID := uint(c.GetFloat64("user_id"))
	hostelID := c.Param("id")

	fav := models.Favorite{
		UserID: userID,
	}

	if err := database.DB.
		Where("user_id = ? AND hostel_id = ?", userID, hostelID).
		First(&models.Favorite{}).Error; err == nil {
		c.JSON(400, gin.H{"error": "Already favorited"})
		return
	}

	fav.HostelID = parseUint(hostelID)
	database.DB.Create(&fav)

	c.JSON(201, gin.H{"message": "Hostel added to favorites"})
}
func RemoveFavorite(c *gin.Context) {
	userID := uint(c.GetFloat64("user_id"))
	hostelID := c.Param("id")

	database.DB.
		Where("user_id = ? AND hostel_id = ?", userID, hostelID).
		Delete(&models.Favorite{})

	c.JSON(200, gin.H{"message": "Hostel removed from favorites"})
}
func ListFavorites(c *gin.Context) {
	userID := uint(c.GetFloat64("user_id"))

	var favorites []models.Favorite
	database.DB.Where("user_id = ?", userID).Find(&favorites)

	var hostelIDs []uint
	for _, f := range favorites {
		hostelIDs = append(hostelIDs, f.HostelID)
	}

	var hostels []models.Hostel
	database.DB.Preload("Images").
		Where("id IN ?", hostelIDs).
		Find(&hostels)

	c.JSON(200, hostels)
}
