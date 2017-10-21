-- Create syntax for 'pictures'

CREATE TABLE `pictures` (
  `uuid` varchar(64) NOT NULL COMMENT '唯一标识',
  `user_id` varchar(64) NOT NULL COMMENT '相片所属的user id',
  `store_path` varchar(255) DEFAULT NULL COMMENT '相片的存储路径，相对路径',
  `description` varchar(255) DEFAULT NULL COMMENT '该相片的描述信息，简介',
  `stat` int(1) DEFAULT NULL COMMENT '相片状态, 0:正常，1:删除',
  `like_count` int(11) DEFAULT NULL COMMENT '被点赞的数量',
  `create_time` int(11) DEFAULT NULL COMMENT '相片上传的时间',
  `update_time` int(11) DEFAULT NULL COMMENT '最近修改时间',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户相片表';
