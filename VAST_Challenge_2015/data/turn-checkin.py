import sys, urllib2
reload(sys)
sys.setdefaultencoding('utf-8') 
import random, os

f = open(r"park-movement-Sun.csv",'r')
line = f.readline()
line = f.readline()
date2 = "null"
f2 = open(r"checkin-Sun.csv",'w')
f2.writelines(["Timestamp,","id,","type,","X,","Y\n"])
while (line):
	date = line[line.find(' ')+1:line.find(',')]
	date3 = date[date.find(':')+1:]
	date = date[0:date.find(':')]+date3[:date3.find(':')]+date3[date3.find(':')+1:]
	line = line[line.find(',')+1:]
	id = line[:line.find(',')]
	line = line[line.find(',')+1:]
	type = line[:line.find(',')]
	line = line[line.find(',')+1:]
	X = line[:line.find(',')]
	line = line[line.find(',')+1:]
	Y = line
	if (date != date2):
		date2 = date
	if (type == "check-in"):
		f2.writelines([date,",",id,",",type,",",X,",",Y])
	line = f.readline()