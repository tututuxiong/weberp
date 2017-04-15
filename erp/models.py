from django.db import models
from datetime import date

# Create your models here.

class SalesOrder(models.Model):
    name = models.CharField(max_length=200, default='')
    status = models.CharField(max_length=50)  # NEW, FINISHED
    saler = models.CharField(max_length=50)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    act_date = models.DateTimeField(default=date.today)
    desc = models.TextField(default='')
    raw_mat_status = models.CharField(max_length=50,default="INIT") # INIT, BUYING, DONE
    mfr_status = models.CharField(max_length=50,default="INIT") # INIT, ONGOING, DONE
    comment = models.TextField(default='')

    def __str__(self):
        return self.name


class SalesItem(models.Model):
    salesOrder = models.ForeignKey(SalesOrder, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    unit = models.CharField(max_length=200,default=None)
    comment = models.CharField(max_length=200,default="")
    est_num = models.IntegerField()
    est_total_price = models.DecimalField(max_digits=12, decimal_places=2)
    def __str__(self):
        return self.name    


class RawMat(models.Model):
    name = models.CharField(max_length=200)
    unit = models.CharField(max_length=200,default=None)
    parent = models.ForeignKey('self', on_delete=models.CASCADE,
                               blank=True, null=True, default=None)  # recursive relationship
    is_leaf = models.BooleanField(default=True)
    def __str__(self):
        return self.name

class RawMatRequirement(models.Model):
    salesItem = models.ForeignKey(SalesItem, on_delete=models.CASCADE)
    rawMaterial = models.ForeignKey(RawMat, on_delete=models.CASCADE)
    num = models.IntegerField()


class RawMatOrder(models.Model):
    salesOrder = models.ForeignKey(SalesOrder)
    act_date = models.DateTimeField(default=date.today)
    status = models.CharField(max_length=50,default="INIT") # INIT, BUYING, DONE
    comment = models.TextField(default='')
    name = models.CharField(max_length=200,default='')
    def __str__(self):
        return self.name
        
class RawMatOrderItem(models.Model):
    rawMatOrder = models.ForeignKey(RawMatOrder, on_delete=models.CASCADE)
    rawMat = models.ForeignKey(RawMat, on_delete=models.CASCADE)
    num = models.IntegerField()
    est_total_price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=50)

class RawMatRepoRecord(models.Model):
    reg_date = models.DateTimeField('when this was registered in this system')
    act_date = models.DateTimeField('when this was actually happened')
    rawMaterial = models.ForeignKey(RawMat)
    batch_nr = models.CharField(max_length=200)
    num = models.IntegerField()


class CheckInRawMatRepoRecord(RawMatRepoRecord):
    act_total_price = models.DecimalField(max_digits=12, decimal_places=2)
    rawMatOrderItem = models.ForeignKey(RawMatOrder, on_delete=models.CASCADE)

class CheckOutRawMatRepoRecord(RawMatRepoRecord):
    salesItem = models.ForeignKey(SalesItem, on_delete=models.CASCADE)
