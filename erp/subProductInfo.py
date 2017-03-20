class SubProductInfo:
    def __init__(self, pid, orderId, name, count, unit, price, comment):
        self.id = pid
        self.orderId = orderId
        self.name = name
        self.count = count
        self.unit = unit
        self.price = price
        self.total = self.count * self.price
        self.comment = comment

    def __repr__(self):
        return repr((self.id,self.orderId,self.name,self.count,self.unit,self.price,self.total,self.comment))

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
