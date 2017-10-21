-- Create syntax for 'user_info'

CREATE TABLE `user_info` (
  `uuid` varchar(64) NOT NULL COMMENT '唯一标识，与users表的uuid相对应',
  `department` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `admission_time` int(4) DEFAULT '0' COMMENT '入学时间，精确到年',
  `graduation_time` int(4) DEFAULT NULL COMMENT '毕业时间，精确到年',
  `hobby` varchar(1024) DEFAULT NULL COMMENT '兴趣爱好',
  `about_me` varchar(2048) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL COMMENT '首次填写时间',
  `update_time` int(11) DEFAULT NULL COMMENT '最近修改时间',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户详细信息表';
