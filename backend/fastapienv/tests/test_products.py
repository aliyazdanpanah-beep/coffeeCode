from fastapi.testclient import TestClient
from main import app

def test_get_all_products_empty(client):
    """Test getting products when database is empty"""
    response = client.get("/product")
    assert response.status_code == 200
    assert response.json() == []

def test_create_product_success(client):
    """Test creating a new product successfully"""
    response = client.post("/create/products/", json={
        "name": "New Laptop",
        "category": "Electronics",
        "price": 25000000,
        "img": "https://example.com/laptop.jpg"
    })
    assert response.status_code == 201
    
    # Verify product was saved
    get_response = client.get("/product")
    assert len(get_response.json()) == 1
    assert get_response.json()[0]["name"] == "New Laptop"

def test_create_product_invalid_name(client):
    """Test creating product with name too short (should fail)"""
    response = client.post("/create/products/", json={
        "name": "ab",  # less than 4 characters
        "category": "Electronics",
        "price": 25000000,
        "img": "https://example.com/laptop.jpg"
    })
    assert response.status_code == 422  # Validation error

def test_create_product_invalid_price(client):
    """Test creating product with zero or negative price"""
    response = client.post("/create/products/", json={
        "name": "Test Product",
        "category": "Electronics",
        "price": 0,  # must be greater than 0
        "img": "https://example.com/image.jpg"
    })
    assert response.status_code == 422

def test_update_product_success(client):
    """Test updating product successfully"""
    # First create a product
    client.post("/create/products/", json={
        "name": "Initial Product",
        "category": "Initial Category",
        "price": 50000,
        "img": "https://example.com/old.jpg"
    })
    
    # Update the product
    update_response = client.put("/update/product/1", json={
        "name": "Updated Product",
        "category": "New Category",
        "price": 75000,
        "img": "https://example.com/new.jpg"
    })
    assert update_response.status_code == 200
    
    # Verify changes
    get_response = client.get("/product")
    updated_product = get_response.json()[0]
    assert updated_product["name"] == "Updated Product"
    assert updated_product["price"] == 75000

def test_update_product_not_found(client):
    """Test updating non-existent product"""
    response = client.put("/update/product/99999", json={
        "name": "Test Product",
        "category": "Test Category",
        "price": 100000,
        "img": "https://example.com/image.jpg"
    })
    assert response.status_code == 404
    assert response.json()["detail"] == "product not found"

def test_delete_product_success(client):
    """Test deleting product successfully"""
    # First create a product
    client.post("/create/products/", json={
        "name": "Product to Delete",
        "category": "Test",
        "price": 100000,
        "img": "https://example.com/image.jpg"
    })
    
    # Delete it
    delete_response = client.delete("/product/delete/1")
    assert delete_response.status_code == 200
    
    # Verify it's deleted
    get_response = client.get("/product")
    assert len(get_response.json()) == 0

def test_delete_product_not_found(client):
    """Test deleting non-existent product"""
    response = client.delete("/product/delete/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "product not found"

def test_multiple_products(client):
    """Test creating and retrieving multiple products"""
    # Create multiple products
    products = [
        {"name": "Product 1", "category": "Category1", "price": 10000, "img": "img1.jpg"},
        {"name": "Product 2", "category": "Category2", "price": 20000, "img": "img2.jpg"},
        {"name": "Product 3", "category": "Category3", "price": 30000, "img": "img3.jpg"},
    ]
    
    for product in products:
        client.post("/create/products/", json=product)
    
    # Get all products
    response = client.get("/product")
    assert len(response.json()) == 3
    
    # Verify product names
    product_names = [p["name"] for p in response.json()]
    assert "Product 1" in product_names
    assert "Product 2" in product_names
    assert "Product 3" in product_names

def test_update_product_partial_data(client):
    """Test that update requires all fields (complete data)"""
    # First create a product
    client.post("/create/products/", json={
        "name": "Original Product",
        "category": "Original Category",
        "price": 50000,
        "img": "https://example.com/original.jpg"
    })
    
    # Try to update with missing fields
    response = client.put("/update/product/1", json={
        "name": "Only Name Changed"
        # missing category, price, img
    })
    assert response.status_code == 422  # Validation error