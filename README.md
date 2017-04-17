# Weberp
Requirment:
npm && Python3 && Django

How to develpment:
cd erp/static/erp/
npm run build
cd ../../../
python3 manage.py runserver 0.0.0.0:8000

   
   Below is the requiment for the first version.
   
1. 用户新订单录入，订单类型：如比芙蓉小学校服100件；

2. 根据订单，生成所需原料清单，结合库存，给出采购建议，生成采购订单； 采购订单需要和订单关联，订单状态变成’采购中‘

3. 采购原料入库，用户记录原料价格；订单状态变成’生产中‘

4. 用户自动会记录原料消耗和成品生成；记录时候需要和订单相关联；

5. 用户在成品生产结束后，更新订单状态成'生产完成'；

5. 用户生成发货单；和订单关联，订单状态变成'发货中'；

6. 用户在收款后，自行关闭订单，状态变成‘完成’；

7. 用户可以查看这次产品生产单价，总价；

8. 管理员可以自己创建和删除商品所需原料，如 衣服 需要面料,拉链等对应关系；

9. 管理员自己创建产出原材料品种;

10.管理员可以自己更新库存状态; 支持管理员更新任何状态（容错处理）;

11.管理员可以设置成品和原料消耗的上限值，如果超过上限，系统需要给于提醒；

开发过程及经验教训总结：

#关于Routing(Angualr 2)
1. routing url的一些限制
    - 新增订单页面，一开始打算使用/order/add为routing url，结果发现不行，会出错；后来改为/order_add。

#关于shared module(Angular 2)
1. 如何使用shared module中的component
    - 将该component添加到shared module的declarations和exports中；
    - 在app module中import shared module;
    - 在其它module中import shared module;

2. 如何使用shared module中的class
    - 直接在使用的地方import

3. 如何使用shared module中的service
    - 在其它module中将该service添加到providers中；
    - 直接在使用的地方import，并在constructor里定义service对象
    - 如果希望service的某些behavior尽早执行，则可以在service中定义一个init函数，并在app加载时调用该init函数

#关于javascript
1. object的拷贝
2. array的定义和初始化
    - 空array对象在使用前要先进行初始化，如声明了names: string[]，则对其操作前先执行names = [];
3. json和java class object的转化
    - 