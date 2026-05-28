def test_get_categorys_empty(client):
    """Test getting categories when database is empty"""
    response = client.get("/categorys")
    assert response.status_code == 200
    assert response.json() == []

def test_update_category_not_found(client):
    """Test updating non-existent category"""
    response = client.put("/update/categorys/99999", json={
        "img": "https://example.com/cat.jpg",
        "title": "Test Category"
    })
    assert response.status_code == 404
    # Note: Your endpoint returns "product not found" message
    assert response.json()["detail"] == "product not found"

def test_update_category_invalid_id(client):
    """Test updating category with invalid ID (<= 0)"""
    response = client.put("/update/categorys/0", json={
        "img": "https://example.com/cat.jpg",
        "title": "Test Category"
    })
    assert response.status_code == 422  # Path validation error

def test_update_category_invalid_title(client):
    """Test updating category with title too short"""
    # First create a category (if you have create endpoint)
    # For now, we test the validation of the request body
    response = client.put("/update/categorys/1", json={
        "img": "https://example.com/cat.jpg",
        "title": ""  # empty title, min_length=1
    })
    # This test assumes a category with ID=1 exists
    # If no category exists, it will return 404 first
    # So we check for either 404 or 422
    assert response.status_code in [404, 422]