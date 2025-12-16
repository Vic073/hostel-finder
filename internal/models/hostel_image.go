package models

import "gorm.io/gorm"

type HostelImage struct {
	gorm.Model
	HostelID uint
	Path     string
}
