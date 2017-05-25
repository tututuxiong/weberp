import json
from .models import *


class UserInfo:
    def __init__(self):
        self.name = ''
        self.password = ''
        self.type = ''

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class UserList:
    def __init__(self):
        self.userList = []

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def getAllUserInfo(self):
         for user_sql in LocalUser.objects.all():
             user = UserInfo()
             user.name = user_sql.name
             user.password = user_sql.password
             user.type = user_sql.userType
             self.userList.append(user)
