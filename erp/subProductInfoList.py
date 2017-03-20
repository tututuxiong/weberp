import json
from .subProductInfo import SubProductInfo

class SubProductInfoList:
    def __init__(self):
        self.subProductInfoList = []
        self.subProductTitle = []
        self.subProductCount = 0

    def addSubProductTitle(self, title):
        self.subProductTitle.append(title)

    def addSubProductInfo(self, subProductInfo):
        self.subProductCount = self.subProductCount + 1
        self.subProductInfoList.append(subProductInfo)

    def __repr__(self):
        return repr((self.subProductInfoList, self.subProductTitle))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
