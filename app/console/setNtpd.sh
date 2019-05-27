#!/bin/bash
# Script para actualizar la hora del iot2000

ntpd -q -g
ln -sf /usr/share/zoneinfo/America/Guayaquil /etc/localtime
hwclock --systohc
