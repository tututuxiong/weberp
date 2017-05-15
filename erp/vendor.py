import json
from .models import *

scuessfullMessage = '{"value":"OK"}'
errorMessage = '{"value":"ERROR"}'

class VendorInfo:
    def __init__(self,name):
        self.name = name
        self.id = 0
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    def __repr__(self):
        return repr((self.id, self.name))
       
    def setJson2Class(self, dict_data):
        for name, value in dict_data.items():
            if hasattr(self, name):
                setattr(self, name, value)

class VendorList:
    def __init__(self):
        self.vendors = []
    def addVendor(self,vendor):
        self.vendors.append(vendor)

    def genVendorsByMaterialId(self, materialId):
        material = RawMat.objects.get(pk=materialId)
        for vendor_sql in material.vendor_set.all():
            vendor = VendorInfo(vendor_sql.name)
            vendor.id = vendor_sql.id
            self.addVendor(vendor)

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
  