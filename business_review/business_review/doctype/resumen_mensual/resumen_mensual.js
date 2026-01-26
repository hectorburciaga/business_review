// Copyright (c) 2026, Bimxcloud and contributors
// For license information, please see license.txt

frappe.ui.form.on("Resumen Mensual", {
// 	refresh(frm) {
    before_save: function(frm) {
        // Combines field_a and field_b into combined_field
        let name = (frm.doc.rm_periodo || '') + '_' + (frm.doc.rm_abbr || '');
        let cos = (frm.doc.rm_costos_sueldos) + (frm.doc.rm_costos_subcontratos) + (frm.doc.rm_costos_lic_comp) + (frm.doc.rm_adquisiciones);
        let gp = (frm.doc.rm_ventas) - cos;
        let gp_per = gp / frm.doc.rm_ventas * 100;
        let total_cos = (frm.doc.rm_viaticos) + (frm.doc.rm_eje) + (frm.doc.rm_sales_mark);
        let ebitda = gp - total_cos;
        let ebitda_per = ebitda / frm.doc.rm_ventas * 100;

        const expenseFields = [
          'rm_sueldos_gast', 'rm_otros_gast', 'rm_gast_renta', 'rm_gast_grals',
          'rm_gast_admon', 'rm_gast_vehi', 'rm_gast_prim', 'rm_gast_hon',
          'rm_gast_pap', 'rm_gast_cuotas', 'rm_gast_cap', 'rm_seg_fian',
          'rm_gast_fin', 'rm_gast_eventos'
        ];

        let tot_ind = expenseFields.reduce((sum, field) => sum + (frm.doc[field] || 0), 0);
        let ebitda2 = ebitda - tot_ind;
        let ebitda2_per = ebitda2 / frm.doc.rm_ventas * 100;

        frm.set_value('rm_name', name.trim());
        frm.set_value('rm_cost_prod', cos);
        frm.set_value('rm_gross_profit', gp);
        frm.set_value('rm_gp_per', gp_per);
        frm.set_value('rm_tot_cos', total_cos);
        frm.set_value('rm_ebitda1', ebitda);
        frm.set_value('rm_ebitda_per', ebitda_per);
        frm.set_value('rm_tot_ind', tot_ind);
        frm.set_value('rm_ebitda2', ebitda2);
        frm.set_value('rm_ebitda2_per', ebitda2_per);

        
    }
 });

