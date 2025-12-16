package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"hostel-finder/internal/config"
	"hostel-finder/internal/models"
)

var DB *gorm.DB

func Connect(cfg *config.Config) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		cfg.DBHost,
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBName,
		cfg.DBPort,
		cfg.DBSSLMode,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB = db
	log.Println("Database connected")
}

// 👇 THIS MUST EXIST
func Migrate() {
	err := DB.AutoMigrate(
		&models.User{},
		&models.Hostel{},
		&models.HostelImage{},
		&models.Favorite{},
		&models.Review{},
	)
	if err != nil {
		log.Fatal("Migration failed:", err)
	}
}
