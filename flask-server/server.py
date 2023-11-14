from flask import Flask, jsonify
from flask_cors import CORS
from store import supabase

app = Flask(__name__)
CORS(app=app)

@app.route('/dashboard/<string:name>', methods=['GET'])
def get_dashboard(name):
    try:
        dashboard_result = supabase.table("Dashboard").select("*").eq("name", name).execute()
        dashboard_data = dashboard_result.get('data', [])

        if not dashboard_data:
            return jsonify({"error": "Dashboard not found"}), 404
        dashboard_data = dashboard_data[0]

        charts_result = supabase.table("Chart").select("*").eq("dashboardName", name).execute()
        charts_data = charts_result.get('data', [])
        dashboard_data['charts'] = charts_data

        return jsonify(dashboard_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chart/<string:id>', methods=['GET'])
def get_chart(id):
    try:
        chart_result = supabase.table("Chart").select("*").eq("id", id).execute()
        chart_data_list = chart_result.get('data', [])

        if not chart_data_list:
            return jsonify({"error": "Chart not found"}), 404
        chart_data = chart_data_list[0]

        # In prod the sql will be fetched from the Chart database schema which will be used to execute on the client-side database. 
        # No way to execute raw sql query via flask backend in supabase!!!
        # Remote function calls available for node.js
        if chart_data['sqlQuery'] == 'line_graph_query':
            analytics_result = supabase.table("Games").select("game_name", "hours_played").execute()
        else:
            analytics_result = supabase.table("Games").select("game_name", "hours_played", "proficiency").execute()
        
        chart_data['analytics'] = analytics_result.get('data', [])
        return jsonify(chart_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/dashboard_list', methods=['GET'])
def get_dashboard_list():
    try:
        dashboard_list = supabase.table("Dashboard").select("*").execute()
        dashboards = dashboard_list.get('data', [])

        if not dashboards:
            return jsonify({"error": "Dashboards not found"}), 404
        
        return jsonify(dashboards)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

