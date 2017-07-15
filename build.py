from bs4 import BeautifulSoup
from distutils.dir_util import copy_tree
import os
import shutil

dist_path = 'dist'

if os.path.exists(dist_path):
	shutil.rmtree(dist_path)
os.mkdir(dist_path)

input = open('index.html','r')
index = BeautifulSoup(input.read(), 'html.parser')
scripts = index.find_all('script')

for type in ['src']:
	div = index.find('div',type)
	if (div == None):
		continue
	print(type)
	output = open(dist_path+'/combined.'+type+'.js','w')
	for script in div.find_all('script'):
		src_file = open(script.get('src'))
		print('\t'+script.get('src'))
		output.write(src_file.read())
		output.write(';')
	div.extract()
	output.close()

print("grunt")
os.system("grunt")
	
tag_src = BeautifulSoup("<script></script>", 'html.parser').script
tag_src['src'] = 'combined.src.min.js'
index.body.append(tag_src)

home = open(dist_path+'/home.html', 'w')
home.write(index.prettify())

copy_tree('lib',dist_path+'/lib')
os.remove(dist_path+'/combined.src.js')