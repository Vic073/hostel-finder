package models

import "gorm.io/gorm"

type Hostel struct {
	gorm.Model
	Name          string
	Location      string
	Price         float64
	Description   string
	OwnerID       uint
	Images        []HostelImage `gorm:"foreignKey:HostelID"`
	Reviews       []Review      `gorm:"foreignKey:HostelID"`
	AverageRating float64       `json:"average_rating"`
}
