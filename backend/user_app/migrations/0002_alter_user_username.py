# Generated by Django 4.2.7 on 2023-12-05 18:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(unique=True, validators=[django.core.validators.RegexValidator('^[A-Za-z][\\w]+', 'Invalid username')]),
        ),
    ]
