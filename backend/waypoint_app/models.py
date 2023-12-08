from django.db import models
from django.core.validators import RegexValidator, MinValueValidator

class WayPoint(models.Model):
    port_name = models.CharField(default="unknown")
    region = models.CharField(default="unknown")
    country_name= models.CharField(default="unknown")
    lat= models.DecimalField(blank=False,null=False, max_digits=19, decimal_places=10)
    lng= models.DecimalField(blank=False,null=False, max_digits=19, decimal_places=10)

    def __str__(self):
        return self.port_name