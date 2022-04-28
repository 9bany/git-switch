package switchcontrol

import dbstore "9bany/swgit/db_store"

type SwitchController interface {
	SaveNewUser(user *dbstore.User)
	UpdateUser(user *dbstore.User)
	DeleteUser(user *dbstore.User)
	ListUser(user *dbstore.User)
	UpdateUserDefault(user *dbstore.User)
	GetUserDefault(user *dbstore.User)
	SwitchUser(user *dbstore.User)
	CheckUserRule(user *dbstore.User)
	Forward(user *dbstore.User)
}
