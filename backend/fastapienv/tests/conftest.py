import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from main import app, get_db
import models

# Test database in memory (completely separate from main database)
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override database dependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create test client fixture
@pytest.fixture
def client():
    # Create test database tables
    models.Base.metadata.create_all(bind=engine)
    with TestClient(app) as test_client:
        yield test_client
    # Clean up after tests
    models.Base.metadata.drop_all(bind=engine)

# Sample product fixture
@pytest.fixture
def sample_product(client):
    """Create a sample product for testing"""
    response = client.post("/create/products/", json={
        "name": "Test Product",
        "category": "Test Category",
        "price": 100000,
        "img": "https://example.com/image.jpg"
    })
    return response