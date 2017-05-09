from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(SalesOrder)
admin.site.register(SalesItem)
admin.site.register(RawMat)
admin.site.register(RawMatRequirement)
admin.site.register(RawMatOrder)
admin.site.register(RawMatOrderItem)
admin.site.register(RawMatRepoRecord)
admin.site.register(CheckInRawMatRepoRecord)
admin.site.register(CheckOutRawMatRepoRecord)
admin.site.register(CheckInProductRepoRecord)
admin.site.register(CheckOutProductRepoRecord)
admin.site.register(Vendor)