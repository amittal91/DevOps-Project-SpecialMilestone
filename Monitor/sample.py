import psutil
import math
import time
import os
import subprocess
threshold = 90
email_id = "mittal.apoorv91@gmail.com"
cpu_usage = 90
host_ip = subprocess.check_output("dig +short myip.opendns.com @resolver1.opendns.com", shell=True).rstrip('\n')
email = "echo The CPU usage is high " + str(cpu_usage) +"% | mail -s \"High CPU usage for " + host_ip + "\" " + email_id
print email
os.system(email)