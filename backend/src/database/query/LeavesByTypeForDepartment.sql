USE jupiter_apparels;
SELECT 
    la.leave_type,
    -- Leaves taken in the current month
    COUNT(*) as total_leaves,
    SUM(CASE 
        WHEN MONTH(la.start_date) = MONTH(CURRENT_DATE()) 
        AND YEAR(la.start_date) = YEAR(CURRENT_DATE()) 
        THEN 1 ELSE 0 END) AS current_month_leaves,

    -- Leaves taken in the last month
    SUM(CASE 
        WHEN MONTH(la.start_date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
        AND YEAR(la.start_date) = YEAR(CURRENT_DATE()) 
        THEN 1 ELSE 0 END) AS last_month_leaves,

    -- Leaves taken this year
    SUM(CASE 
        WHEN YEAR(la.start_date) = YEAR(CURRENT_DATE())
        THEN 1 ELSE 0 END) AS this_year_leaves,
	-- Leaves taken last year
		SUM(CASE 
			WHEN YEAR(la.start_date) = YEAR(CURRENT_DATE() - INTERVAL 1 YEAR)
			THEN 1 ELSE 0 END) AS last_year_leaves
FROM 
    leave_applications la
LEFT JOIN 
    employees e ON e.employee_id = la.employee_id
WHERE 
   e.department_id = 'D001'  -- Replace with the given department ID
GROUP BY 
    la.leave_type WITH ROLLUP;
