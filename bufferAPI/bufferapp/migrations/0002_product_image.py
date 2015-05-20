# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('bufferapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default=datetime.datetime(2015, 5, 15, 14, 13, 50, 244515, tzinfo=utc), upload_to=''),
            preserve_default=False,
        ),
    ]
