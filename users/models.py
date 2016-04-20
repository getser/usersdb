# -*- coding: utf-8 -*-

from django.db import models


class User(models.Model):

    class Meta(object):
        verbose_name = 'Користувач'
        verbose_name_plural = 'Користувачі'


    first_name = models.CharField(
        max_length=256,
        blank=True,
        null=True,
        default='',
        verbose_name="Ім'я")

    last_name = models.CharField(
        max_length=256,
        blank=True,
        null=True,
        default='',
        verbose_name="Прізвище")

    middle_name = models.CharField(
        max_length=256,
        blank=True,
        null=True,
        default='',
        verbose_name="По-батькові",
        )

    birthday = models.DateField(
        max_length=256,
        blank=True,
        null=True,
        default='',
        verbose_name="Дата народження",
        )

    e_mail = models.CharField(
        max_length=256,
        blank=True,
        null=True,
        default='',
        verbose_name="Електронна пошта",
        )

    def __str__(self):
        return '%s %s' %(self.first_name, self.last_name)
        