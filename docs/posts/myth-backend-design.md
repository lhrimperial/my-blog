---
title: 神话学院
description: 为什么我要重新搭建一个博客，以及它会分享什么内容。
date: 2024-12-01
category: 随笔
cover: /images/garden-light.jpg
tags:
  - 创作
  - 生活方式
  - 思考
---

# 神话学院管理系统 - 数据库设计与功能架构

## 系统概述

神话小学（Myth Academy）是一所拥有5个年级、50个班级、约5000-6200名学生的学校。本系统为学校提供全面的信息化管理解决方案。

### 系统特点
- **无外键设计**：应用层保证数据一致性
- **状态码设计**：使用TINYINT/SMALLINT配合应用枚举类
- **权限分离**：基于角色的访问控制
- **扩展性强**：模块化设计便于功能扩展

## 数据库表结构设计

### 1. 用户与权限相关表

#### 1.1 用户表 (sys_user)
```sql
CREATE TABLE sys_user (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码（加密存储）',
    real_name VARCHAR(50) NOT NULL COMMENT '真实姓名',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
    phone VARCHAR(20) COMMENT '手机号',
    email VARCHAR(100) COMMENT '邮箱',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

#### 1.2 角色表 (sys_role)
```sql
CREATE TABLE sys_role (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
    role_code VARCHAR(50) NOT NULL COMMENT '角色编码',
    role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
    role_desc VARCHAR(200) COMMENT '角色描述',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';
```

#### 1.3 用户角色关联表 (sys_user_role)
```sql
CREATE TABLE sys_user_role (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
    user_id BIGINT(20) NOT NULL COMMENT '用户ID',
    role_id BIGINT(20) NOT NULL COMMENT '角色ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_role (user_id, role_id),
    INDEX idx_user_id (user_id),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';
```

#### 1.4 权限表 (sys_permission)
```sql
CREATE TABLE sys_permission (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
    perm_code VARCHAR(100) NOT NULL COMMENT '权限编码',
    perm_name VARCHAR(100) NOT NULL COMMENT '权限名称',
    perm_type TINYINT(1) NOT NULL COMMENT '权限类型：1-菜单 2-按钮 3-接口',
    parent_id BIGINT(20) NOT NULL DEFAULT 0 COMMENT '父权限ID',
    resource_path VARCHAR(200) COMMENT '资源路径',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用 1-启用',
    sort_order INT(11) NOT NULL DEFAULT 0 COMMENT '排序',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_perm_code (perm_code),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';
```

#### 1.5 角色权限关联表 (sys_role_permission)
```sql
CREATE TABLE sys_role_permission (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
    role_id BIGINT(20) NOT NULL COMMENT '角色ID',
    permission_id BIGINT(20) NOT NULL COMMENT '权限ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_role_permission (role_id, permission_id),
    INDEX idx_role_id (role_id),
    INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表';
```

### 2. 基础数据表

#### 2.1 学生表 (edu_student)
```sql
CREATE TABLE edu_student (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '学生ID',
    user_id BIGINT(20) NOT NULL COMMENT '用户ID',
    student_no VARCHAR(20) NOT NULL COMMENT '学号',
    student_name VARCHAR(50) NOT NULL COMMENT '学生姓名',
    gender TINYINT(1) NOT NULL COMMENT '性别：1-男 2-女',
    birth_date DATE COMMENT '出生日期',
    id_card VARCHAR(20) COMMENT '身份证号',
    phone VARCHAR(20) COMMENT '联系电话',
    address VARCHAR(200) COMMENT '家庭地址',
    parent_name VARCHAR(50) COMMENT '家长姓名',
    parent_phone VARCHAR(20) COMMENT '家长电话',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-离校 1-在校',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_student_no (student_no),
    INDEX idx_student_name (student_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生表';
```

#### 2.2 教师表 (edu_teacher)
```sql
CREATE TABLE edu_teacher (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '教师ID',
    user_id BIGINT(20) NOT NULL COMMENT '用户ID',
    teacher_no VARCHAR(20) NOT NULL COMMENT '工号',
    teacher_name VARCHAR(50) NOT NULL COMMENT '教师姓名',
    gender TINYINT(1) NOT NULL COMMENT '性别：1-男 2-女',
    birth_date DATE COMMENT '出生日期',
    id_card VARCHAR(20) COMMENT '身份证号',
    phone VARCHAR(20) COMMENT '联系电话',
    email VARCHAR(100) COMMENT '邮箱',
    subject_code VARCHAR(20) COMMENT '任教科目编码',
    job_title VARCHAR(50) COMMENT '职称',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-离职 1-在职',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_teacher_no (teacher_no),
    INDEX idx_teacher_name (teacher_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='教师表';
```

### 3. 教务管理表

#### 3.1 教室表 (edu_classroom)
```sql
CREATE TABLE edu_classroom (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '教室ID',
    classroom_code VARCHAR(10) NOT NULL COMMENT '教室编码（如：10101）',
    classroom_name VARCHAR(50) NOT NULL COMMENT '教室名称',
    building_no TINYINT(1) NOT NULL COMMENT '教学楼编号：1-主教学楼',
    floor_no TINYINT(1) NOT NULL COMMENT '楼层：1-4层',
    room_no TINYINT(2) NOT NULL COMMENT '教室编号：1-20',
    capacity INT(11) NOT NULL COMMENT '容纳人数',
    room_type TINYINT(1) NOT NULL COMMENT '教室类型：1-普通教室 2-实验室 3-多媒体教室 4-音乐教室 5-美术教室',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-停用 1-启用',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_classroom_code (classroom_code),
    INDEX idx_building_floor (building_no, floor_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='教室表';
```

#### 3.2 课程表 (edu_course)
```sql
CREATE TABLE edu_course (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '课程ID',
    course_code VARCHAR(20) NOT NULL COMMENT '课程编码',
    course_name VARCHAR(100) NOT NULL COMMENT '课程名称',
    course_type TINYINT(1) NOT NULL COMMENT '课程类型：1-主科 2-副科 3-活动课',
    grade_range VARCHAR(20) COMMENT '适用年级范围（如：1-2,3-5）',
    credit DECIMAL(3,1) COMMENT '学分',
    course_hours INT(11) COMMENT '课时数',
    course_desc VARCHAR(500) COMMENT '课程描述',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-停用 1-启用',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_course_code (course_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='课程表';
```

#### 3.3 学年学期表 (edu_academic_year)
```sql
CREATE TABLE edu_academic_year (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '学年ID',
    year_code VARCHAR(20) NOT NULL COMMENT '学年编码（如：2025-2026）',
    year_name VARCHAR(50) NOT NULL COMMENT '学年名称',
    start_date DATE NOT NULL COMMENT '开始日期',
    end_date DATE NOT NULL COMMENT '结束日期',
    semester TINYINT(1) NOT NULL COMMENT '学期：1-秋季学期 2-春季学期',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-停用 1-启用',
    is_current TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否当前学年：0-否 1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_year_semester (year_code, semester)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学年学期表';
```

#### 3.4 班级表 (edu_class)
```sql
CREATE TABLE edu_class (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '班级ID',
    class_code VARCHAR(20) NOT NULL COMMENT '班级编码（如：20250101）',
    class_name VARCHAR(50) NOT NULL COMMENT '班级名称（如：一年级一班）',
    academic_year_id BIGINT(20) NOT NULL COMMENT '学年ID',
    grade TINYINT(1) NOT NULL COMMENT '年级：1-一年级 2-二年级 3-三年级 4-四年级 5-五年级',
    class_no TINYINT(2) NOT NULL COMMENT '班级序号：1-10',
    classroom_id BIGINT(20) COMMENT '教室ID',
    head_teacher_id BIGINT(20) COMMENT '班主任ID',
    student_count INT(11) NOT NULL DEFAULT 0 COMMENT '学生人数',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-解散 1-正常',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_class_code (class_code),
    INDEX idx_academic_year (academic_year_id),
    INDEX idx_grade_class (grade, class_no),
    INDEX idx_head_teacher (head_teacher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班级表';
```

#### 3.5 班级学生关联表 (edu_class_student)
```sql
CREATE TABLE edu_class_student (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
    class_id BIGINT(20) NOT NULL COMMENT '班级ID',
    student_id BIGINT(20) NOT NULL COMMENT '学生ID',
    join_date DATE NOT NULL COMMENT '加入日期',
    leave_date DATE COMMENT '离开日期',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态：0-已离开 1-在读',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_class_student (class_id, student_id),
    INDEX idx_class_id (class_id),
    INDEX idx_student_id (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班级学生关联表';
```

## 用户权限体系设计

### 1. 角色定义

| 角色编码 | 角色名称 | 描述 | 人数 |
|---------|---------|------|------|
| ADMIN | 系统管理员 | 系统最高权限，负责账户开通和权限分配 | 2-3人 |
| EDU_ADMIN | 教务管理员 | 教务管理核心角色，负责基础数据录入 | 8-10人 |
| TEACHER | 教师 | 普通教师，教学相关功能 | 400-500人 |
| HEAD_TEACHER | 班主任 | 班级管理，学生管理 | 120人 |
| GRADE_LEADER | 年级组长 | 年级管理，协调工作 | 12人 |

### 2. 权限分配

#### 系统管理员 (ADMIN)
- 用户管理：用户增删改查、账户开通
- 角色管理：角色配置、权限分配
- 系统监控：日志查看、系统配置

#### 教务管理员 (EDU_ADMIN)
- 学生管理：学生信息录入、修改
- 教师管理：教师信息录入、修改
- 基础数据：教室、课程、学年、班级管理
- 班级分配：学生分班、班主任分配

#### 班主任 (HEAD_TEACHER)
- 班级管理：本班学生信息查看
- 学生管理：本班学生状态维护
- 教学管理：班级课程安排查看

#### 年级组长 (GRADE_LEADER)
- 年级管理：本年级班级查看
- 教师协调：本年级教师工作安排

#### 教师 (TEACHER)
- 个人信息：个人资料维护
- 教学查看：任课班级和课程查看

## 初始化数据

### 1. 角色数据初始化
```sql
INSERT INTO sys_role (role_code, role_name, role_desc, status) VALUES
('ADMIN', '系统管理员', '系统最高权限管理员', 1),
('EDU_ADMIN', '教务管理员', '教务管理核心角色', 1),
('TEACHER', '教师', '普通教师', 1),
('HEAD_TEACHER', '班主任', '班级管理负责人', 1),
('GRADE_LEADER', '年级组长', '年级管理负责人', 1);
```

### 2. 系统管理员账户初始化
```sql
INSERT INTO sys_user (username, password, real_name, phone, email) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVPz', '系统管理员', '13800000000', 'admin@myth.edu.cn');

INSERT INTO sys_user_role (user_id, role_id) VALUES (1, 1);
```

### 3. 教务管理员账户初始化
```sql
INSERT INTO sys_user (username, password, real_name, phone, email) VALUES
('edu_admin1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVPz', '教务管理员一', '13800000001', 'edu_admin1@myth.edu.cn'),
('edu_admin2', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVPz', '教务管理员二', '13800000002', 'edu_admin2@myth.edu.cn');

INSERT INTO sys_user_role (user_id, role_id) VALUES 
(2, 2),
(3, 2);
```

### 4. 课程数据初始化
```sql
INSERT INTO edu_course (course_code, course_name, course_type, grade_range, course_hours) VALUES
('CHINESE', '语文', 1, '1-5', 160),
('MATH', '数学', 1, '1-5', 120),
('PE', '体育', 2, '1-5', 80),
('SCIENCE', '科学', 1, '1-5', 60),
('PD_LIFE', '品德与生活', 1, '1-2', 40),
('PD_SOCIAL', '品德与社会', 1, '3-5', 40),
('FOREIGN_LANG', '外语', 1, '3-5', 80),
('MUSIC', '音乐', 2, '1-5', 40),
('FINE_ART', '美术', 2, '1-5', 40),
('ART', '艺术', 2, '1-2', 40),
('COMPREHENSIVE', '综合实践活动', 3, '3-5', 40),
('IT', '信息技术', 1, '3-5', 40);
```

### 5. 教室数据初始化（完整80间教室）
```sql
INSERT INTO edu_classroom (classroom_code, classroom_name, building_no, floor_no, room_no, capacity, room_type) VALUES
-- 1楼教室（20间）
('10101', '101教室', 1, 1, 1, 60, 1),
('10102', '102教室', 1, 1, 2, 60, 1),
('10103', '103教室', 1, 1, 3, 60, 1),
('10104', '104教室', 1, 1, 4, 60, 1),
('10105', '105教室', 1, 1, 5, 60, 1),
('10106', '106教室', 1, 1, 6, 60, 1),
('10107', '107教室', 1, 1, 7, 60, 1),
('10108', '108教室', 1, 1, 8, 60, 1),
('10109', '109教室', 1, 1, 9, 60, 1),
('10110', '110教室', 1, 1, 10, 60, 1),
('10111', '111教室', 1, 1, 11, 60, 1),
('10112', '112教室', 1, 1, 12, 60, 1),
('10113', '113教室', 1, 1, 13, 60, 1),
('10114', '114教室', 1, 1, 14, 60, 1),
('10115', '115教室', 1, 1, 15, 60, 1),
('10116', '116教室', 1, 1, 16, 60, 1),
('10117', '117教室', 1, 1, 17, 60, 1),
('10118', '118教室', 1, 1, 18, 60, 1),
('10119', '119教室', 1, 1, 19, 60, 1),
('10120', '120教室', 1, 1, 20, 60, 1),

-- 2楼教室（20间）
('10201', '201教室', 1, 2, 1, 60, 1),
('10202', '202教室', 1, 2, 2, 60, 1),
('10203', '203教室', 1, 2, 3, 60, 1),
('10204', '204教室', 1, 2, 4, 60, 1),
('10205', '205教室', 1, 2, 5, 60, 1),
('10206', '206教室', 1, 2, 6, 60, 1),
('10207', '207教室', 1, 2, 7, 60, 1),
('10208', '208教室', 1, 2, 8, 60, 1),
('10209', '209教室', 1, 2, 9, 60, 1),
('10210', '210教室', 1, 2, 10, 60, 1),
('10211', '211教室', 1, 2, 11, 60, 1),
('10212', '212教室', 1, 2, 12, 60, 1),
('10213', '213教室', 1, 2, 13, 60, 1),
('10214', '214教室', 1, 2, 14, 60, 1),
('10215', '215教室', 1, 2, 15, 60, 1),
('10216', '216教室', 1, 2, 16, 60, 1),
('10217', '217教室', 1, 2, 17, 60, 1),
('10218', '218教室', 1, 2, 18, 60, 1),
('10219', '219教室', 1, 2, 19, 60, 1),
('10220', '220教室', 1, 2, 20, 60, 1),

-- 3楼教室（20间）
('10301', '301教室', 1, 3, 1, 60, 1),
('10302', '302教室', 1, 3, 2, 60, 1),
('10303', '303教室', 1, 3, 3, 60, 1),
('10304', '304教室', 1, 3, 4, 60, 1),
('10305', '305教室', 1, 3, 5, 60, 1),
('10306', '306教室', 1, 3, 6, 60, 1),
('10307', '307教室', 1, 3, 7, 60, 1),
('10308', '308教室', 1, 3, 8, 60, 1),
('10309', '309教室', 1, 3, 9, 60, 1),
('10310', '310教室', 1, 3, 10, 60, 1),
('10311', '311教室', 1, 3, 11, 60, 1),
('10312', '312教室', 1, 3, 12, 60, 1),
('10313', '313教室', 1, 3, 13, 60, 1),
('10314', '314教室', 1, 3, 14, 60, 1),
('10315', '315教室', 1, 3, 15, 60, 1),
('10316', '316教室', 1, 3, 16, 60, 1),
('10317', '317教室', 1, 3, 17, 60, 1),
('10318', '318教室', 1, 3, 18, 60, 1),
('10319', '319教室', 1, 3, 19, 60, 1),
('10320', '320教室', 1, 3, 20, 60, 1),

-- 4楼教室（20间）
('10401', '401教室', 1, 4, 1, 60, 1),
('10402', '402教室', 1, 4, 2, 60, 1),
('10403', '403教室', 1, 4, 3, 60, 1),
('10404', '404教室', 1, 4, 4, 60, 1),
('10405', '405教室', 1, 4, 5, 60, 1),
('10406', '406教室', 1, 4, 6, 60, 1),
('10407', '407教室', 1, 4, 7, 60, 1),
('10408', '408教室', 1, 4, 8, 60, 1),
('10409', '409教室', 1, 4, 9, 60, 1),
('10410', '410教室', 1, 4, 10, 60, 1),
('10411', '411教室', 1, 4, 11, 60, 1),
('10412', '412教室', 1, 4, 12, 60, 1),
('10413', '413教室', 1, 4, 13, 60, 1),
('10414', '414教室', 1, 4, 14, 60, 1),
('10415', '415教室', 1, 4, 15, 60, 1),
('10416', '416教室', 1, 4, 16, 60, 1),
('10417', '417教室', 1, 4, 17, 60, 1),
('10418', '418教室', 1, 4, 18, 60, 1),
('10419', '419教室', 1, 4, 19, 60, 1),
('10420', '420教室', 1, 4, 20, 60, 1);
```

### 6. 学年学期初始化
```sql
INSERT INTO edu_academic_year (year_code, year_name, start_date, end_date, semester, is_current) VALUES
('2025-2026', '2025-2026学年', '2025-09-01', '2026-07-15', 1, 1),
('2025-2026', '2025-2026学年', '2026-02-15', '2026-07-15', 2, 0);
```

### 7. 班级数据初始化（完整50个班级）
```sql
INSERT INTO edu_class (class_code, class_name, academic_year_id, grade, class_no) VALUES
-- 一年级10个班
('20250101', '一年级一班', 1, 1, 1),
('20250102', '一年级二班', 1, 1, 2),
('20250103', '一年级三班', 1, 1, 3),
('20250104', '一年级四班', 1, 1, 4),
('20250105', '一年级五班', 1, 1, 5),
('20250106', '一年级六班', 1, 1, 6),
('20250107', '一年级七班', 1, 1, 7),
('20250108', '一年级八班', 1, 1, 8),
('20250109', '一年级九班', 1, 1, 9),
('20250110', '一年级十班', 1, 1, 10),

-- 二年级10个班
('20250201', '二年级一班', 1, 2, 1),
('20250202', '二年级二班', 1, 2, 2),
('20250203', '二年级三班', 1, 2, 3),
('20250204', '二年级四班', 1, 2, 4),
('20250205', '二年级五班', 1, 2, 5),
('20250206', '二年级六班', 1, 2, 6),
('20250207', '二年级七班', 1, 2, 7),
('20250208', '二年级八班', 1, 2, 8),
('20250209', '二年级九班', 1, 2, 9),
('20250210', '二年级十班', 1, 2, 10),

-- 三年级10个班
('20250301', '三年级一班', 1, 3, 1),
('20250302', '三年级二班', 1, 3, 2),
('20250303', '三年级三班', 1, 3, 3),
('20250304', '三年级四班', 1, 3, 4),
('20250305', '三年级五班', 1, 3, 5),
('20250306', '三年级六班', 1, 3, 6),
('20250307', '三年级七班', 1, 3, 7),
('20250308', '三年级八班', 1, 3, 8),
('20250309', '三年级九班', 1, 3, 9),
('20250310', '三年级十班', 1, 3, 10),

-- 四年级10个班
('20250401', '四年级一班', 1, 4, 1),
('20250402', '四年级二班', 1, 4, 2),
('20250403', '四年级三班', 1, 4, 3),
('20250404', '四年级四班', 1, 4, 4),
('20250405', '四年级五班', 1, 4, 5),
('20250406', '四年级六班', 1, 4, 6),
('20250407', '四年级七班', 1, 4, 7),
('20250408', '四年级八班', 1, 4, 8),
('20250409', '四年级九班', 1, 4, 9),
('20250410', '四年级十班', 1, 4, 10),

-- 五年级10个班
('20250501', '五年级一班', 1, 5, 1),
('20250502', '五年级二班', 1, 5, 2),
('20250503', '五年级三班', 1, 5, 3),
('20250504', '五年级四班', 1, 5, 4),
('20250505', '五年级五班', 1, 5, 5),
('20250506', '五年级六班', 1, 5, 6),
('20250507', '五年级七班', 1, 5, 7),
('20250508', '五年级八班', 1, 5, 8),
('20250509', '五年级九班', 1, 5, 9),
('20250510', '五年级十班', 1, 5, 10);
```

## 应用层枚举类设计

### 基础枚举基类
```python
from enum import Enum

class BaseEnum(Enum):
    """枚举基类，提供通用功能"""
    
    @property
    def code(self):
        """获取状态码"""
        return self.value[0]
    
    @property
    def desc(self):
        """获取描述"""
        return self.value[1]
    
    @classmethod
    def get_desc_by_code(cls, code):
        """根据状态码获取描述"""
        for member in cls:
            if member.code == code:
                return member.desc
        return None
    
    @classmethod
    def get_enum_by_code(cls, code):
        """根据状态码获取枚举成员"""
        for member in cls:
            if member.code == code:
                return member
        return None
    
    @classmethod
    def get_all_codes(cls):
        """获取所有状态码"""
        return [member.code for member in cls]
    
    @classmethod
    def get_all_descs(cls):
        """获取所有描述"""
        return [member.desc for member in cls]

### 通用状态枚举

class CommonStatusEnum(BaseEnum):
    """通用状态枚举"""
    DISABLED = (0, "禁用")
    ENABLED = (1, "启用")

class EnableStatusEnum(BaseEnum):
    """启用/停用状态枚举"""
    DISABLED = (0, "停用")
    ENABLED = (1, "启用")

# 别名定义，提高语义清晰度
UserStatusEnum = CommonStatusEnum  # 用户状态
ClassroomStatusEnum = EnableStatusEnum  # 教室状态
CourseStatusEnum = EnableStatusEnum  # 课程状态
AcademicYearStatusEnum = EnableStatusEnum  # 学年状态

### 业务特定状态枚举

class StudentStatusEnum(BaseEnum):
    """学生状态枚举"""
    LEFT = (0, "离校")
    IN_SCHOOL = (1, "在校")

class TeacherStatusEnum(BaseEnum):
    """教师状态枚举"""
    RESIGNED = (0, "离职")
    ACTIVE = (1, "在职")

class ClassStatusEnum(BaseEnum):
    """班级状态枚举"""
    DISSOLVED = (0, "解散")
    NORMAL = (1, "正常")

class ClassStudentStatusEnum(BaseEnum):
    """班级学生状态枚举"""
    LEFT = (0, "已离开")
    STUDYING = (1, "在读")

### 基础数据枚举

class GenderEnum(BaseEnum):
    """性别枚举"""
    MALE = (1, "男")
    FEMALE = (2, "女")

class GradeEnum(BaseEnum):
    """年级枚举"""
    GRADE_1 = (1, "一年级")
    GRADE_2 = (2, "二年级")
    GRADE_3 = (3, "三年级")
    GRADE_4 = (4, "四年级")
    GRADE_5 = (5, "五年级")

class SemesterEnum(BaseEnum):
    """学期枚举"""
    AUTUMN = (1, "秋季学期")
    SPRING = (2, "春季学期")

### 业务类型枚举

class PermissionTypeEnum(BaseEnum):
    """权限类型枚举"""
    MENU = (1, "菜单")
    BUTTON = (2, "按钮")
    API = (3, "接口")

class CourseTypeEnum(BaseEnum):
    """课程类型枚举"""
    MAIN_SUBJECT = (1, "主科")
    MINOR_SUBJECT = (2, "副科")
    ACTIVITY = (3, "活动课")

class RoomTypeEnum(BaseEnum):
    """教室类型枚举"""
    NORMAL = (1, "普通教室")
    LAB = (2, "实验室")
    MULTIMEDIA = (3, "多媒体教室")
    MUSIC = (4, "音乐教室")
    ART = (5, "美术教室")

### 角色枚举

class RoleEnum(BaseEnum):
    """角色枚举"""
    ADMIN = ("ADMIN", "系统管理员")
    EDU_ADMIN = ("EDU_ADMIN", "教务管理员")
    TEACHER = ("TEACHER", "教师")
    HEAD_TEACHER = ("HEAD_TEACHER", "班主任")
    GRADE_LEADER = ("GRADE_LEADER", "年级组长")

### 示例使用

# 使用示例
if __name__ == "__main__":
    # 获取状态描述
    print(CommonStatusEnum.ENABLED.desc)  # 输出: 启用
    
    # 根据状态码获取描述
    print(CommonStatusEnum.get_desc_by_code(1))  # 输出: 启用
    
    # 获取所有年级
    for grade in GradeEnum:
        print(f"{grade.desc}: {grade.code}")
    
    # 判断角色权限
    if RoleEnum.ADMIN.code == "ADMIN":
        print("这是系统管理员")
    
    # 使用别名
    print(UserStatusEnum.ENABLED.desc)  # 输出: 启用
    print(ClassroomStatusEnum.ENABLED.desc)  # 输出: 启用
    
    # 获取所有状态码
    print(CommonStatusEnum.get_all_codes())  # 输出: [0, 1]
    
    # 根据状态码获取枚举成员
    enum_member = CommonStatusEnum.get_enum_by_code(1)
    print(enum_member.desc if enum_member else "未找到")  # 输出: 启用
```

## 系统架构特点

### 1. 数据一致性保障
- 应用层事务控制
- 业务逻辑校验
- 数据操作审计日志

### 2. 扩展性设计
- 模块化表结构
- 配置化权限管理
- 年级、班级可动态扩展

### 3. 性能优化
- 合理的索引设计
- 分表分库预留
- 读写分离支持

### 4. 安全性考虑
- 密码加密存储
- 操作权限控制
- 数据访问审计

这套设计完全符合阿里开发规范，具备良好的可扩展性和维护性，能够满足神话小学当前及未来的管理需求。
