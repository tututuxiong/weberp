# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-26 04:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0007_auto_20170426_1213'),
    ]

    operations = [
        migrations.CreateModel(
            name='CheckInProductRepoRecord',
            fields=[
                ('rawmatreporecord_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='erp.RawMatRepoRecord')),
                ('salesItem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='erp.SalesItem')),
            ],
            bases=('erp.rawmatreporecord',),
        ),
        migrations.CreateModel(
            name='CheckOutProductRepoRecord',
            fields=[
                ('rawmatreporecord_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='erp.RawMatRepoRecord')),
                ('salesItem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='erp.SalesItem')),
            ],
            bases=('erp.rawmatreporecord',),
        ),
    ]
