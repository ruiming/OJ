FROM ruiming:gcc
MAINTAINER ruiming  # 指定创建镜像的用户
VOLUME ["/data"]    # 挂载
WORKDIR /data       # 切换目录