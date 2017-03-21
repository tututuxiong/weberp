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
        if subProductInfo.id != 0:
            self.subProductCount = self.subProductCount + 1
            self.subProductInfoList.append(subProductInfo)
            return True
        else:
            return False

    def updateSubProductInfo(self, subProductInfo):
        isFind = False
        for index in range(len(self.subProductInfoList)):
            if self.subProductInfoList[index].id == subProductInfo.id:
                self.subProductInfoList[index] = subProductInfo
                isFind = True
        return isFind

    def removeSubProductInfo(self, id):
        isFind = False
        for subProduct_iter in self.subProductInfoList:
            if subProduct_iter.id == id:
                self.subProductInfoList.remove(subProduct_iter)
                self.subProductCount = self.subProductCount - 1
                isFind = True
        return isFind
    
    def getSubProductInfo(self, id):
        isFind = False
        for subProduct_iter in self.subProductInfoList:
            print('list id', subProduct_iter.id)
            if subProduct_iter.id == id:
                isFind = True
                return subProduct_iter
        if isFind != True:
            return None

    def __repr__(self):
        return repr((self.subProductInfoList, self.subProductTitle))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
