import json

class SubProductInfo:
    count = 0
    def __init__(self):
        self.id = 0
        self.orderId = 0
        self.name = ''
        self.count = 0
        self.unit = ''
        self.price = 0
        self.total = ''
        self.comment = ''

    def setFormalId(self, orderId):
        print(orderId)
        if self.id == 0:
            self.id = SubProductInfo.count + 1
            SubProductInfo.count = SubProductInfo.count + 1
        self.orderId = orderId

    def setValue(self, name, count, unit, price, comment):
        self.name = name
        self.count = count
        self.unit = unit
        self.price = price
        self.total = self.count * self.price
        self.comment = comment

    def __repr__(self):
        return repr((self.id, self.orderId, self.name, self.count, self.unit, self.price, self.total, self.comment))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
    def setJson2Class(self,jsonData):
        dict_data = json.loads(jsonData)
        for name,value in vars(jsonData).items():
            if hasattr(self, name):
                setattr(self,name,value)
            

        
        
    

