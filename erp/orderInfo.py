import json

class OrderInfo:
    def __init__(self, pid, name, date, desc, price, sales, comment, orderStatus):
        self.id = pid
        self.intenalId = ''
        self.name = name
        self.date = date
        self.desc = desc
        self.price = price
        self.sales = sales
        self.comment = comment 
        self.status = orderStatus
        self.materialStatus = '' 
        self.deliveryStatus = ''

    def toJson(self):
        return json.dumps(self,default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def __repr__(self):
        return repr((self.id, self.intenalId,self.name,self.date,self.desc,self.price,self.sales,self.comment,self.orderStatus,self.materialStatus,self.deliveryStatus))



