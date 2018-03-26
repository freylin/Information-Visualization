import sys, urllib2
reload(sys)
sys.setdefaultencoding('utf-8') 
import random, os

f = open(r"checkin-Sun.csv",'r')
line = f.readline()
line = f.readline()
f2 = open(r"color-Sun.csv",'w')
cr = [0 for x in range(3000000)]
cb = [0 for x in range(3000000)]
cg = [0 for x in range(3000000)]
b = [0 for x in range(3000000)]
# co = "Heat_color[\"%s\"]=\"rgb(%d,%d,%d)\"; "
while (line):
	date = line[:line.find(',')]
	line = line[line.find(',')+1:]
	id = line[:line.find(',')]
	line = line[line.find(',')+1:]
	type = line[:line.find(',')]
	line = line[line.find(',')+1:]
	X = line[:line.find(',')]
	line = line[line.find(',')+1:]
	Y = line
	id1 = int(id)
	b[id1] = 1;
	X1 = int(X)
	Y1 = int(Y)
	date1 = int(date)
	cr[id1] += (X1 * Y1 + date1)%256
	cg[id1] += 0
	cb[id1] += (date1 - X1 + Y1)%256
	cr[id1] %= 256;
	cg[id1] %= 256;
	cb[id1] %= 256;
	line = f.readline()
print "ok"
for i in range(3000000):
	if (b[i]):
		f2.write("Heat_color3[%d]=\"rgb(%d,%d,%d)\"; "%(i,cr[i],cg[i],cb[i]))