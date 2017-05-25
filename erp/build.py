import os,shutil
targetDir = './static/erp/templates'
for root, dirs, files in os.walk("./static/erp/src/app"):
    for file in files:
        if file.endswith(".html"):
             source = os.path.join(root, file)
             print(source)
             shutil.copy(source, targetDir)