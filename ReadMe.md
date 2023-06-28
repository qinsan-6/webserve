
/**
    静态资源文件夹 public 中存放向外共享图片,svg资源可直接访问
    也可通过访问/public/icons get 获取icon相关资料
 */
 已使用接口
 路径                pamars参数                         body参数                                  方法        简述
 /public/icons     type="middle" | "switch"                                                      get     获取index页面中相关图标信息


/login                                       username,password,freelogin                         post   用户登录接口
/tokenlogin                                             token                                    post   直接使用token登录的接口
/register                                 username, password,surname,appellation                 post   用户注册接口

开发中接口
/data/not
/data/delnote
/data/addnote
/data/write
/data/save