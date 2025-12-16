package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID   uint
	HostelID uint
	Rating   int
	Comment  string
}
