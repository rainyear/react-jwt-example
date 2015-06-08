/*
PACKAGE main
rainy @ 2015-06-08 <me@rainy.im>
*/
package main

import "github.com/gin-gonic/gin"

type Login struct {
	Name string `json: "name"`
	Pass string `json: "pass"`
}

func main() {
	router := gin.Default()
	router.Use(func(c *gin.Context) {
		// Run this on all requests
		// Should be moved to a proper middleware
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		c.Next()
	})
	router.OPTIONS("/*cors", func(c *gin.Context) {
		// Empty 200 response
	})

	router.POST("/user/token", func(c *gin.Context) {
		var login Login
		c.Bind(&login)
		c.JSON(200, gin.H{"code": 200, "msg": "OK"})
	})
	//router.POST("/user/logout", func(c *gin.Context) {

	//})

	router.Run(":3001")
}
