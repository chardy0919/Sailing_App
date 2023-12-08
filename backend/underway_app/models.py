from django.db import models
from user_app.models import User
from waypoint_app.models import WayPoint
from django.core.validators import RegexValidator, MinValueValidator
from underway_app.validators import validate_future_date
from django.utils import timezone

class UnderWay(models.Model):
    captain= models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='captain'
    )
    route_name=models.CharField(
        blank=False,
        null=False,
        validators=[
            RegexValidator(r'[\w]+', 'Invalid route name')
        ],
        error_messages="invalid route name"
    )
    description=models.TextField()
    start_date=models.DateField(
        blank=False,
        null=False,
        validators=[validate_future_date, MinValueValidator(limit_value=timezone.now().date())],
        error_messages="invalid start date"
    )
    location= models.CharField(
        blank=False,
        null=False,
        error_messages= "invalid location"
    )
    manning= models.IntegerField(
        blank=False,
        null=False,
        default=1,
        validators=[MinValueValidator(1)]
    )
    duration=models.IntegerField(
        blank=False,
        null=False,
        error_messages="invalid duration"
    )

    crew=models.ManyToManyField(User)
    
    waypoints=models.ManyToManyField(WayPoint)
    

