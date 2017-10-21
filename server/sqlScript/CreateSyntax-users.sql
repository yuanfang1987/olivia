-- Create syntax for 'users'

CREATE TABLE `users` (
  `uuid` varchar(64) NOT NULL COMMENT '唯一标识',
  `email` varchar(255) NOT NULL COMMENT '登录邮箱',
  `password` varchar(255) NOT NULL COMMENT '登录密码',
  `status` int(10) NOT NULL DEFAULT '0' COMMENT '状态: 1好 2锁定 3已删除',
  `name` varchar(64) DEFAULT NULL COMMENT '用户昵称',
  `avatar` varchar(1024) DEFAULT NULL COMMENT '用户头像',
  `gender` int(11) DEFAULT NULL COMMENT '性别：0女；1男',
  `role` varchar(255) DEFAULT NULL COMMENT '用户角色',
  `lock_time` int(11) DEFAULT NULL COMMENT '锁定时间',
  `delete_time` int(11) DEFAULT NULL COMMENT '账号删除时间',
  `create_time` int(11) DEFAULT NULL COMMENT '用户注册时间',
  `update_time` int(11) DEFAULT NULL COMMENT '最近修改时间',
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `index_on_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理用户表';
