# Team Name: Evolve
# Design a python application that tracks inventory of a retail store, allowing users to add new products, update quatities, and generate reports on stock levels.
import tkinter as tk

a1 = []

# Adding new products and its quatity to the array
def add_product():
    product = product_entry.get()
    quantity = int(quantity_entry.get())
    for i in range(len(a1)):
        if a1[i] == product:
            report_text.insert(tk.END, "Product already exists. Please update the quantity of " + a1[i] + ".\n")
            break
    else:
        a1.append(product)
        a1.append(quantity)
        product_entry.delete(0, tk.END)
        quantity_entry.delete(0, tk.END)

# Updating the product quantity by adding the new amount to the already present product
def update_addquantity():
    product = product_entry.get()
    quantity1 = int(quantity_entry.get())
    for i in range(len(a1)):
        if a1[i] == product:
            a1[i+1] = a1[i+1] + quantity1
            break
    product_entry.delete(0, tk.END)
    quantity_entry.delete(0, tk.END)

# Updating the product quantity by deleting the new amount from the already present product
def update_deletequantity():
    product = product_entry.get()
    quantity1 = int(quantity_entry.get())
    for i in range(len(a1)):
        if a1[i] == product:
            a1[i+1] = a1[i+1] - quantity1
            break
    product_entry.delete(0, tk.END)
    quantity_entry.delete(0, tk.END)

# Removing the product from the inventory
def removepro():
    product = product_entry.get()
    for i in range(len(a1)):
        if a1[i] == product:
            del a1[i:i+2]
            break
    product_entry.delete(0, tk.END)
    quantity_entry.delete(0, tk.END)

# Generate a stock level report
def generate_report():
    report_text.delete(1.0, tk.END)
    for i in range(0, len(a1), 2):
        report_text.insert(tk.END, a1[i] + " : " + str(a1[i+1]) + "\n")
    with open("inventory.txt", "w") as f:
        for i in range(0, len(a1), 2):
            f.write(a1[i] + " : " + str(a1[i+1]) + "\n")

root = tk.Tk()
root.title("Inventory Tracker")

product_label = tk.Label(root, text="Product Name:")
product_label.grid(row=0, column=0, padx=5, pady=5)

quantity_label = tk.Label(root, text="Quantity:")
quantity_label.grid(row=1, column=0, padx=5, pady=5)

product_entry = tk.Entry(root)
product_entry.grid(row=0, column=1, padx=5, pady=5)

quantity_entry = tk.Entry(root)
quantity_entry.grid(row=1, column=1, padx=5, pady=5)

add_button = tk.Button(root, text="Add Product", command=add_product)
add_button.grid(row=2, column=0, padx=5, pady=5)

remove_button = tk.Button(root, text="Delete Product", command=removepro)
remove_button.grid(row=2, column=1, padx=5, pady=5)

update_buttonadd = tk.Button(root, text="Update Quantity", command=update_addquantity)
update_buttonadd.grid(row=3, column=0, padx=5, pady=5)

update_buttondel = tk.Button(root, text="Delete Quantity", command=update_deletequantity)
update_buttondel.grid(row=3, column=1, padx=5, pady=5)

report_button = tk.Button(root, text="Generate Report", command=generate_report)
report_button.grid(row=4, column=0, padx=5, pady=5)

exit_button = tk.Button(root, text="Exit", command=root.quit)
exit_button.grid(row=4, column=1, padx=5, pady=5)

report_text = tk.Text(root, height=10, width=30)
report_text.grid(row=5, columnspan=2, padx=5, pady=5)

root.mainloop() # This is to run the application continuesly without closing the window
