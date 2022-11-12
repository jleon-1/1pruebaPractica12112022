/*LISTA DE ROLES DE PAGOS DE TODOS LOS EMPLEADOS*/
select rp.id_rol_pago, emp.id_empleado, emp.nombres, emp.apellidos, emp.cedula, rp.neto_pagar, rp.estado 
from empleados emp, roles_pagos rp 
where emp.id_empleado = rp.id_empleado 
and rp.estado = 'A';

/*registro de roles de pagos por empleado*/
select rp.id_rol_pago, emp.id_empleado, emp.nombres, emp.apellidos, emp.cedula, rp.neto_pagar, rp.estado 
from empleados emp, roles_pagos rp 
where emp.id_empleado = rp.id_empleado 
and emp.id_empleado=2
and rp.estado = 'A';