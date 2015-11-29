import psutil
import math
import time
import os
import subprocess
threshold = 90
email_id = "mittal.apoorv91@gmail.com"
reboot_command = "sudo reboot now"
cpu_util_list = [0,0,0]
host_ip = subprocess.check_output("dig +short myip.opendns.com @resolver1.opendns.com", shell=True).rstrip('\n')
while True:
# print ("-----------------------",output,"----------------------")
    
    cpu_usage = int(math.floor(psutil.cpu_percent(interval=1)))
    cpu_overload = 0
    if cpu_usage >= threshold:
        cpu_overload = 1
    cpu_util_list.pop()
    cpu_util_list.append(cpu_overload)
    if cpu_util_list[0] + cpu_util_list[1] + cpu_util_list[2] == 3:
        email = "echo The CPU usage is high " + str(cpu_usage) +"% | mail -s \"High CPU usage for " + host_ip + "\" " + email_id
        os.system(email)
        os.system(reboot_command)
    time.sleep(20)