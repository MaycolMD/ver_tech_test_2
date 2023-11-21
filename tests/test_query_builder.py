import pytest
from app.routes import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_execute_query_date(client):
    response = client.get('/execute_query?date=2023-01-01')
    assert response.status_code == 200

    response = client.get('/execute_query?primary_type=OTHER OFFENSE')
    assert response.status_code == 200

    response = client.get('/execute_query?description=THEFT/RECOVERY: AUTOMOBILE')
    assert response.status_code == 200

    response = client.get('/execute_query?location_description=SIDEWALK')
    assert response.status_code == 200

    response = client.get('/execute_query?arrest=True')
    assert response.status_code == 200

    response = client.get('/execute_query?district=5')
    assert response.status_code == 200

    response = client.get('/execute_query?district=6&date=2020-10-05&primary_type=ROBBERY&description=ARMED - HANDGUN&location_description=STREET&arrest=False')
    assert response.status_code == 200