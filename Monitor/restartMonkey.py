import psutil
import math
import time
import os
import subprocess
from Naked.toolshed.shell import execute_js

threshold = 90
email_id = "mittal.apoorv91@gmail.com"
reboot_command = "sudo reboot now"
cpu_util_list = []
cpu_util_list.append(0)
cpu_util_list.append(0)
cpu_util_list.append(0)
host_ip = subprocess.check_output("dig +short myip.opendns.com @resolver1.opendns.com", shell=True).rstrip('\n')
while True:
    cpu_usage = int(math.floor(psutil.cpu_percent(interval=1)))
    print ("-----------------------",cpu_usage,"----------------------")
    parameters = host_ip + " " +str(cpu_usage)
    success = execute_js('updateRedisCpu.js',parameters)
    cpu_overload = 0
    if cpu_usage >= threshold:
        cpu_overload = 1
    cpu_util_list.pop(0)
    cpu_util_list.append(cpu_overload)
    print cpu_util_list
    if cpu_util_list[0] + cpu_util_list[1] + cpu_util_list[2] == 3:
       
        email = "echo The CPU usage is high " + str(cpu_usage) +"% | mail -s \"High CPU usage for " + host_ip + "\" " + email_id
        print email
        failure = execute_js('removeRedisEntry.js',host_ip)
        # os.system(email)
        # os.system(reboot_command)
    time.sleep(5)