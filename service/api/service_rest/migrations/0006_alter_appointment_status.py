# Generated by Django 4.0.3 on 2023-07-28 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_rename_vip_appointment_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('canceled', 'canceled'), ('finished', 'finished')], default='pending', max_length=25),
        ),
    ]
