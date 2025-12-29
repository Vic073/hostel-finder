package main

import (
	"hostel-finder/internal/config"
	"hostel-finder/internal/database"
	"hostel-finder/internal/routes"
	"hostel-finder/internal/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()

	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	database.Connect(cfg)
	database.Migrate()

	r := gin.Default()
	r.Use(middleware.CORSMiddleware())


	r.Static("/uploads", "./uploads")

	r.LoadHTMLGlob("internal/templates/*")

	routes.RegisterRoutes(r)

	r.Run(":" + cfg.AppPort)
}
