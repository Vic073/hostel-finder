package utils

import "strconv"

func parseUint(s string) uint {
	id, _ := strconv.ParseUint(s, 10, 64)
	return uint(id)
}
