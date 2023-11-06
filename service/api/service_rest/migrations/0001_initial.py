# Generated by Django 4.0.3 on 2023-07-25 19:45

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17, validators=[django.core.validators.RegexValidator(code='invalid_vin', message='VIN must be 17 characters long and contain only uppercase letts (except I, O, Q) and numbers.', regex='^[A-HJ-NPR-ZO-9]{17}$')])),
                ('sold', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('reason', models.CharField(max_length=100)),
                ('vin', models.CharField(max_length=17, validators=[django.core.validators.RegexValidator(code='invalid_vin', message='VIN must be 17 characters long and contain only uppercase letts (except I, O, Q) and numbers.', regex='^[A-HJ-NPR-ZO-9]{17}$')])),
                ('customer', models.CharField(max_length=100)),
                ('status', models.CharField(choices=[('pending', 'pending'), ('panceled', 'canceled'), ('finished', 'finished')], default='pending', max_length=25)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='service_rest.technician')),
            ],
        ),
    ]