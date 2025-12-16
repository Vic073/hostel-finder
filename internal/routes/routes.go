package routes

import (
	"github.com/gin-gonic/gin"

	"hostel-finder/internal/handlers"
	"hostel-finder/internal/middleware"
)

func RegisterRoutes(r *gin.Engine) {

	// Public routes
	r.GET("/ping", handlers.Ping)

	auth := r.Group("/auth")
	{
		auth.POST("/register", handlers.Register)
		auth.POST("/login", handlers.Login)
	}

	// Protected routes
	protected := r.Group("/protected")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/me", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"user_id": c.GetFloat64("user_id"),
				"role":    c.GetString("role"),
			})
		})
	}

	// Hostel routes
	hostels := r.Group("/hostels")
	{
		hostels.GET("", handlers.ListHostels)

		hostels.POST(
			"",
			middleware.AuthMiddleware(),
			middleware.RequireRole("owner"),
			handlers.CreateHostel,
		)

		hostels.PUT(
			"/:id",
			middleware.AuthMiddleware(),
			middleware.RequireRole("owner"),
			handlers.UpdateHostel,
		)

		hostels.DELETE(
			"/:id",
			middleware.AuthMiddleware(),
			middleware.RequireRole("owner"),
			handlers.DeleteHostel,
		)

		hostels.POST(
			"/:id/images",
			middleware.AuthMiddleware(),
			middleware.RequireRole("owner"),
			handlers.UploadHostelImage,
		)

	}

	r.GET("/", handlers.ShowHostelsPage)

	// Favorite routes
	favorites := r.Group("/")
	favorites.Use(middleware.AuthMiddleware(), middleware.RequireRole("student"))
	{
		favorites.POST("/hostels/:id/favorite", handlers.AddFavorite)
		favorites.DELETE("/hostels/:id/favorite", handlers.RemoveFavorite)
		favorites.GET("/me/favorites", handlers.ListFavorites)
	}

	// Review routes
	reviews := r.Group("/hostels/:id")
	{
		reviews.GET("/reviews", handlers.ListReviews)
		reviews.POST(
			"/reviews",
			middleware.AuthMiddleware(),
			middleware.RequireRole("student"),
			handlers.AddReview,
		)
	}

}
