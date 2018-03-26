import sys, urllib2
reload(sys)
sys.setdefaultencoding('utf-8') 
import random, os

f = open(r"park-movement-Sun.csv",'r')
line = f.readline()
line = f.readline()
# f2 = open(r"color-Sun.csv",'w')
b = [0 for x in range(3000000)]
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

	if (date == "13143" or date == "TimestamTimestamTimestamp"):
		line = f.readline()
		continue;
	id1 = int(id)
	f2 = open(r"dot/Sun/%s.csv"%id,'a')
	if (not b[id1]):
		f2.writelines(["Timestamp,","id,","type,","X,","Y\n"])
		b[id1] = 1
	f2.writelines([date,",",id,",",type,",",X,",",Y])
	f2.close;
	line = f.readline()

print "ok"